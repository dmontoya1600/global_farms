from app.models.farm import Transaction
import math
from flask import Blueprint, jsonify, request, session, current_app
from app.models import db, Farm, User, UserWallet, FarmWallet, Transaction
from app.forms import OrderForm
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/', methods=['POST'])
def buyShare():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        shares = form.data['shares']
        order_type = form.data['orderType']
        farmId = form.data['farmId']
        userId = form.data['userId']


        farm = Farm.query.get(farmId)

        farm_wallet = FarmWallet.query.filter(FarmWallet.farmId == farmId ).first()
        user_wallet = UserWallet.query.filter(UserWallet.userId == userId).first()
        totalCost = farm.averageSharePrice * shares

        if(order_type == 'buy'):
            if(shares > farm_wallet.shares): return {'message': "Farm doesn't enough shares"}

            if(user_wallet.buyingPower < totalCost): return {"message": "Insufficient funds"}

            newBalance = user_wallet.buyingPower - totalCost

            user_wallet.buyingPower = newBalance

            farm_wallet.buyingPower = totalCost + farm_wallet.buyingPower

            if(Transaction.query.filter(Transaction.userId == userId, Transaction.farmId == farmId).first()):
                transaction = Transaction.query.filter(Transaction.userId == userId, Transaction.farmId == farmId).first()
                newAmount = transaction.usdAmount + totalCost
                newShares = transaction.shares + shares
                transaction.usdAmount = newAmount
                transaction.shares = newShares
            else:
                transaction = Transaction(
                    userId = userId,
                    farmId = farmId,
                    usdAmount = totalCost,
                    shares = shares,
                )
                db.session.add(transaction)

            db.session.commit()

            updated_wallet = user_wallet.to_dict()
            updated_wallet['buyingPower'] = newBalance

            return updated_wallet
        elif(order_type == 'sell'):
            newBalance = user_wallet.buyingPower + totalCost

            user_wallet.buyingPower = newBalance

            if(totalCost > farm_wallet.buyingPower): return {'message': "Farm doesn't enough funds!"}

            farm_wallet.buyingPower = farm_wallet.buyingPower - totalCost

            if(Transaction.query.filter(Transaction.userId == userId, Transaction.farmId == farmId).first()):
                transaction = Transaction.query.filter(Transaction.userId == userId, Transaction.farmId == farmId).first()

                newAmount = transaction.usdAmount - totalCost
                newShares = transaction.shares - shares
                if(newShares < 0): return {'message:', "You don't own enough shares"}

                transaction.usdAmount = newAmount
                transaction.shares = newShares
            else: return {'message': "You don't own any of these shares"}
            db.session.commit()

            updated_wallet = user_wallet.to_dict()
            updated_wallet['buyingPower'] = newBalance

            return updated_wallet


    else: return {'message': 'form is invalid'}


@transaction_routes.route('/<int:id>')
def getMarketPrice(id):
    allTransactions = Transaction.query.filter(Transaction.farmId == id).all()

    sumDollars = 0
    totalShares = 0
    for transaction in allTransactions:
        sumDollars += transaction.usdAmount
        totalShares += transaction.shares
    avg = sumDollars / totalShares

    return {'market_price': avg}

@transaction_routes.route('/<int:id>/owned')
def getAllOwnedFarms(id):
    allTransactions = Transaction.query.filter(Transaction.userId == id).all()

    owned_farms = []
    total_value = 0
    for transaction in allTransactions:
        total_value += transaction.usdAmount

    for transaction in allTransactions:
        farm = Farm.query.get(transaction.farmId)

        updated_transaction = transaction.to_dict()
        updated_transaction['percentage_of_portfolio'] = transaction.usdAmount / total_value
        updated_transaction['name'] = farm.name
        updated_transaction['image_url'] = farm.image_url

        owned_farms.append(updated_transaction)

    return {"total_value": total_value, "owned_farms": owned_farms}

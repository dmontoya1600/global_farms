from app.models import db, UserWallet, FarmWallet, Transaction


# Adds a demo user, you can add other users here if you want
def seed_userWallets():
    demo_wallet = UserWallet(
        userId=1, buyingPower=0.00)
    marnie_wallet = UserWallet(
         userId=2, buyingPower=0.00)
    bobbie_wallet = UserWallet(
         userId=3, buyingPower=0.00)
    db.session.add(demo_wallet)
    db.session.add(marnie_wallet)
    db.session.add(bobbie_wallet)

    db.session.commit()

def seed_farmWallets():
    blue_acres_wallet = FarmWallet(
        farmId=1, shares=600, buyingPower=0
    )
    hill_tops_wallet = FarmWallet(
        farmId=2, shares=600, buyingPower=0
    )
    potato_ville_wallet = FarmWallet(
        farmId=3, shares=600, buyingPower=0
    )

    blue_transaction = Transaction(
        userId=1, farmId=1, usdAmount=30400, shares=400
    )
    hill_transaction = Transaction(
        userId=2, farmId=2, usdAmount=30400, shares=400
    )
    potato_transaction = Transaction(
        userId=3, farmId=3, usdAmount=30400, shares=400
    )


    db.session.add(blue_acres_wallet)
    db.session.add(hill_tops_wallet)
    db.session.add(potato_ville_wallet)

    db.session.add(blue_transaction)
    db.session.add(hill_transaction)
    db.session.add(potato_transaction)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_userWallets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_farmWallets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

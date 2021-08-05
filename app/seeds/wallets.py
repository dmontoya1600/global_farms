from app.models import db, UserWallet


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


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_userWallets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

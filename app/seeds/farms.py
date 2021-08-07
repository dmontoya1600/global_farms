from app.models import db, Farm


def seed_farms():
    demo_farm = Farm(
        name='Blue Acres', averageYield=0.05, userId=1, averageSharePrice=76.00)
    marnie_farm = Farm(
        name='Hill Tops', averageYield=0.03, userId=2, averageSharePrice=76.00)
    bobbie_farm = Farm(
        name='Potato Ville', averageYield=0.04, userId=3, averageSharePrice=76.00)

    db.session.add(demo_farm)
    db.session.add(marnie_farm)
    db.session.add(bobbie_farm)

    db.session.commit()

def undo_farms():
    db.session.execute('TRUNCATE farms RESTART IDENTITY CASCADE;')
    db.session.commit()

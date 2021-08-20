from app.models import db, Farm


def seed_farms():
    demo_farm = Farm(
        name='Blue Acres', averageYield=0.05, userId=1, averageSharePrice=76.00, image_url="https://vanguardrenewables.com/wp-content/uploads/2020/09/RainbowFarm-1024x726.jpg", about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    marnie_farm = Farm(
        name='Hill Tops', averageYield=0.03, userId=2, averageSharePrice=76.00, image_url="https://thumbs.dreamstime.com/b/wisconsin-dairy-farm-barn-field-corn-passing-rain-storm-leaves-clouds-blue-sky-as-passes-summer-32350485.jpg", about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    bobbie_farm = Farm(
        name='Potato Ville', averageYield=0.04, userId=3, averageSharePrice=76.00, image_url="https://www.beginningfarmers.org/wp-content/uploads/sites/4/2016/02/Fam-spring-BEST-2.jpg", about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    

    db.session.add(demo_farm)
    db.session.add(marnie_farm)
    db.session.add(bobbie_farm)

    db.session.commit()

def undo_farms():
    db.session.execute('TRUNCATE farms RESTART IDENTITY CASCADE;')
    db.session.commit()

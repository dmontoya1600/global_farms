from flask.cli import AppGroup
from .users import seed_users, undo_users
from .farms import seed_farms, undo_farms
from .wallets import seed_userWallets, undo_userWallets, seed_farmWallets, undo_farmWallets

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_farms()
    seed_userWallets()
    seed_farmWallets()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_farms()
    undo_userWallets()
    undo_farmWallets()
    # Add other undo functions here

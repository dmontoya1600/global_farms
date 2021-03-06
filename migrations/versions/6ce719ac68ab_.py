"""empty message

Revision ID: 6ce719ac68ab
Revises: 
Create Date: 2021-08-09 06:15:04.688383

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6ce719ac68ab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('farms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=True),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('averageYield', sa.Float(), nullable=True),
    sa.Column('averageSharePrice', sa.Float(), nullable=True),
    sa.Column('averageRating', sa.Numeric(precision=2, scale=1), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('about', sa.Text(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('location')
    )
    op.create_table('userWallets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('buyingPower', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('farmWallets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('farmId', sa.Integer(), nullable=True),
    sa.Column('shares', sa.Integer(), nullable=True),
    sa.Column('buyingPower', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['farmId'], ['farms.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saved_farms',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('farmId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['farmId'], ['farms.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'farmId')
    )
    op.create_table('transactions',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('farmId', sa.Integer(), nullable=False),
    sa.Column('usdAmount', sa.Float(), nullable=True),
    sa.Column('shares', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['farmId'], ['farms.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'farmId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactions')
    op.drop_table('saved_farms')
    op.drop_table('farmWallets')
    op.drop_table('userWallets')
    op.drop_table('farms')
    op.drop_table('users')
    # ### end Alembic commands ###

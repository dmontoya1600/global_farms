"""empty message

Revision ID: ac1ea8462944
Revises: e6045425d154
Create Date: 2021-08-04 14:02:12.866695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac1ea8462944'
down_revision = 'e6045425d154'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('farmWallets', sa.Column('buyingPower', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('farmWallets', 'buyingPower')
    # ### end Alembic commands ###

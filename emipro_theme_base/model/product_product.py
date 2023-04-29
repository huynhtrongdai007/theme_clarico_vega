from odoo import models, fields, api

class ProductProduct(models.Model):
    _inherit='product.product'

    qty_available_now = fields.Integer('Quantity available now')
    qty_sum_suppliers = fields.Integer('Quantity sum suppliers')
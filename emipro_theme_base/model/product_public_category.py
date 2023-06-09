# -*- coding: utf-8 -*-

"""
    This model is used to create a html field.
"""

from odoo import api, fields, models, _


class ProductPublicCategory(models.Model):
    _inherit = "product.public.category"

    is_category_page = fields.Boolean(string='Allow Category Page', help="It will set the separate page for this category")
    category_page = fields.Many2one("website.page", string="Select Page", help="Select the page which you want to set for this category.")
    icon = fields.Binary('Category Icon')
    primary_category = fields.Boolean(string='Is Primary Category')
    description = fields.Html(string='Description')
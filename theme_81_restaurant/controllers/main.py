from odoo import http
from odoo.http import request
import json

class Main(http.Controller):
    @http.route('/order_reservation',type='http', user='public', website=True, csrf=False)
    def reservation(self, name,phone,description, **kwargs):
        print("===ok")
        vals_crm_opportunity = {
            "type":"opportunity",
            "name": name,
            "phone":phone,
            "description":description
        }

        request.env['crm.lead'].sudo().create(vals_crm_opportunity)
        body = {
            "success": {
                "code":200,
                "message":"Đã đặt bàn thành công",
            }
        }
        print("===========",body)
        return json.dumps(body)

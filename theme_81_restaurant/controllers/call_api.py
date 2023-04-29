import xmlrpc.client

url = 'https://demo.pre.cloudmedia.vn'
db = 'website'
username = 'admin'
password = 'admin'

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
uid = common.authenticate(db,username,password,{})
if uid:
    print("authentication success")
else:
    print("authentication failed")

models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))
partners = models.execute_kw(db,uid,password,'res.partner','search',[[['email','=','huyhung@gmail.com']]])
print("==>", partners)
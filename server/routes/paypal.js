var paypal = require('paypal-rest-sdk');
 
paypal.configure({
  'mode': 'sandbox', // Chọn sandbox hoặc live
  'client_id': 'AS2_jKwf3Aoz_F8sK1ncoX0jYYkMTvsjX3wIhuHmpTwEy966zWmjz657gSGWrov2pG-tbDyPxvK2izcS',
  'client_secret': 'EA0hbXT13iqnXm6F12-aUx6-11QIxWokLH7Fmf4MvimkzHWShU5yOFIW44EG0av1cmlxac91uZv8sNbo'
});
 
var create_payment_json = {
  "intent": "sale",
  "payer": {
      "payment_method": "paypal"
  },
  "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
  },
  "transactions": [{
      "item_list": {
          "items": [{
              "name": "item",
              "sku": "item",
              "price": "1.00",
              "currency": "USD",
              "quantity": 1
          }]
      },
      "amount": {
          "currency": "USD",
          "total": "1.00"
      },
      "description": "This is the payment description."
  }]
};
 
paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});
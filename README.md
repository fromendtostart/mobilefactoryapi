To use this app :

Clone the repository - 

> git clone https://github.com/fromendtostart/mobilefactoryapi

Navigate to working directory

> cd mobilefactoryapi

Install dependencies

> npm install

Start server

> npm start


Server would be running on port 3000.

You can make requests to this port using Postman or any other way. A sample request looks like this - 

http://localhost:3000/orders

Sample request body - 

{
    "components" : ["I", "A", "D", "F", "K"]
}

Routes in API -  HTTP POST /orders.

To check validity of order, orders controller checks whether request is in proper format and then iterates over each code in order. It keeps tracks of category count and at end checks if category count of each category is one. If yes then it send the final order.

Some sample tests - 


{
    "compoents" : ["L", "B", "D", "F", "J"]
} //should return bad request error.

{
    "components" : 2
} //should return bad request error

{
    "components" : ["A"]
} //should return error of one object belong to one and only one category

{
    "components" : ["I", "B", "D", "F", "J"]
} //should return error of one object belong to one and only one category

{
    "components" : ["L", "B", "D", "F", "J"]
} //should return {"order_id":"some-id","total":143.78,"parts":["Plastic Body","OLED Screen","Wide-Angle Camera","USB-C Port","iOS OS"]}

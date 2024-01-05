const parts = require('../data.js');

const createOrder = (req, res) => {
    const orderedComponents = req.body.components;
    
    const componentsInCategory = {};

    const order = {
        "order_id": "some-id",
        "total": 0,
        "parts": []
    };

    for (let category of Object.keys(parts)) componentsInCategory[category] = 0;


    const makeOrder = (part, price) => {
        order["parts"].push(part);
        order["total"]+= price;
    }

    const processItems = (componentCode, category) => {
        for (let item of parts[category]) {
            if (componentCode === item.code) {
                componentsInCategory[category]++;
                makeOrder(item.part, item.price);
            }
        }
    }

    for (let componentCode of orderedComponents) {
        for (let category of Object.keys(parts)) processItems(componentCode, category);
    }

    let isValid = true;

    for (let categoryCount of Object.values(componentsInCategory)) {
        if (categoryCount !== 1) {
            isValid = false;
            break;
        }
    }

    if (isValid) res.send(JSON.stringify(order));
    else res.send(JSON.stringify({ error: 'Invalid selection. Each feature must belong to one and only one category.' }));
}

module.exports = createOrder;

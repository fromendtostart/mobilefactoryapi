const parts = require('../data.js');

const createOrder = (req, res) => {
    try {
        const orderedComponents = req.body.components;
    
        if (!orderedComponents || !Array.isArray(orderedComponents)) {
            res.status(400).send("Please send components in proper way");
            return;
        }
        
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
    
        if (isValid) res.status(200).send(JSON.stringify(order));
        else res.status(400).send(JSON.stringify({ error: "Each feature must belong to one and only one category." }));
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
}

module.exports = createOrder;

import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };
    async componentDidMount() {
        try {
            const { data: orders } = await axios.get('/orders.json');
            const fetchedOrders = [];
            for (let key in orders) {
                fetchedOrders.push({
                    ...orders[key],
                    id: key,
                });
            }
            this.setState({ loading: false, orders: fetchedOrders });
        } catch (e) {
            this.setState({ loading: false });
        }
    }
    render() {
        let orders = <Spinner />;
        if (this.state.orders.length) {
            orders = this.state.orders.map((order) => {
                return <Order ingredients={order.ingredients} price={order.price} key={order.id} />;
            });
        }
        return <div>{orders}</div>;
    }
}

export default withErrorHandler(Orders, axios);

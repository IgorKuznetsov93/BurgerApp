import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };

    orderHandler = async (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: '123',
                email: '123',
                address: '123',
                postalCode: '123',
            },
        };
        try {
            await axios.post('/orders.json', order);
            this.props.history.push('/');
        } catch (e) {
            console.log(e);
        }
        this.setState({ loading: false });
    };

    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type='text'
                    name='name'
                    placeholder='Your Name'
                ></input>
                <input
                    className={classes.Input}
                    type='email'
                    name='email'
                    placeholder='Your Mail'
                ></input>
                <input
                    className={classes.Input}
                    type='text'
                    name='street'
                    placeholder='Street'
                ></input>
                <input
                    className={classes.Input}
                    type='text'
                    name='postalCode'
                    placeholder='Postal code'
                ></input>
                <Button btnType='Success' clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;

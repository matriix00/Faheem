import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import ChatComponent from './ChatComponent';
import store from '../store';
const keyExtractor = ({ id }) => id.toString();

export default class ChatList extends Component {

    constructor(props) {
      super(props);
      this.state= {
         image: props.image
      }
    }

    renderItem = ({ item  }) => {
            return (
                    <ChatComponent
                        message={item.message}
                        time={item.created_at}
                        fl= {item.sender_id===this.props.id? "right": "lift"}
                        read={item.read_at? true: false}
                        pending= {item.pending? true:false}
                        image= {this.state.image}
                        readAll= {this.props.readAll}
                    />
            );
    };
    render() {
        const { items } = this.props;
        return (
            <FlatList
                data={items}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                ref = "flatList"
                onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
                onLayout={() => this.refs.flatList.scrollToEnd({})}
            />
        );
    }
}

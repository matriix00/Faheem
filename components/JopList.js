import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import JopListItem from './JopListItem';

const keyExtractor = ({ id }) => id.toString();

export default class JopList extends Component {
    renderItem = ({ item: { id, image, title, NumberWorker } }) => (

        <TouchableOpacity onPress={() => this.props.on.navigation.navigate('CreateProblem', { type: title,serviceId:id })} activeOpacity={0.8} >
            <JopListItem
                ImageLink={'https://faheem.zwdmedia.com/images/' + image}
                JopType={title}
                NumberWorker={NumberWorker}
            />
        </TouchableOpacity>
    );
    render() {
        const { items } = this.props;
        return (
            <View style={styles.root}>
                <FlatList
                    data={items}
                    renderItem={this.renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fafcfa',
        flex: 1,
    }
});

import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import EmptyList from './EmptyList';
import SportivItem from './SportivItem';

const SportiviList = (props) => {

    const [items, setItems] = useState([
        { id: 1, nume: 'RADU MARIAN', email: 'radumrn@gmail.com', varsta: 36, gen: true, stareSanatate: 'Sanatos' },
        { id: 10, nume: 'ULMEANU FLORENTINA ANA-MARIA', email: 'florence@gmail.com', varsta: 29, gen: false, stareSanatate: 'Sanatoasa' },
        { id: 2, nume: 'GHEORGHE GHEORGHE', email: 'radumrn@gmail.com', varsta: 36, gen: true, stareSanatate: 'Sanatos' },
        { id: 3, nume: 'BANATEANU ANA-MARIA', email: 'florence@gmail.com', varsta: 29, gen: false, stareSanatate: 'Sanatoasa' },
        { id: 4, nume: 'VATAVU DANIEL', email: 'radumrn@gmail.com', varsta: 36, gen: true, stareSanatate: 'Sanatos' },
        { id: 5, nume: 'TOADER GABRIELA', email: 'florence@gmail.com', varsta: 29, gen: false, stareSanatate: 'Sanatoasa' },
        { id: 6, nume: 'NICOLAE LEONTIN', email: 'radumrn@gmail.com', varsta: 36, gen: true, stareSanatate: 'Sanatos' },
        { id: 7, nume: 'PANTEA GIULIA', email: 'florence@gmail.com', varsta: 29, gen: false, stareSanatate: 'Sanatoasa' },
        { id: 8, nume: 'DUILAS PETRE', email: 'radumrn@gmail.com', varsta: 36, gen: true, stareSanatate: 'Sanatos' },
        { id: 9, nume: 'MOCANU LAURENTIA', email: 'florence@gmail.com', varsta: 29, gen: false, stareSanatate: 'Sanatoasa' },
    ]);


    const renderListItem=(item)=>{
        return(<SportivItem item={item} />);
    };

    return (<FlatList data={items}
        renderItem={({ item, index }) =>renderListItem(item)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={() => (<EmptyList />)}
        keyExtractor={item => item.id.toString()}
    />);
};

const styles = StyleSheet.create({
    listContainer:{
        height:'100%',
    },
    contentContainer: {
        flexGrow: 1,
        padding: 0,
    }
});
export default SportiviList;
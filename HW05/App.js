import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Linking} from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

const NewsItem = ({item}) => {
  const onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  return(
    <Card title = {item.title} image = {
      item.urlToImage !== '' && item.urlToImage !== null ? {uri: item.urlToImage} : null} 
      style = {styles.containerFlex}>
      <View style = {{
        flexDirection: "column", 
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Text>{moment(item.publishedAt).format('LLL')}</Text>
        <View style = {{flexDirection: "row"}}>
          <Text style = {{fontWeight: "bold"}}>Source from </Text>
          <Text>{item.source.name}</Text>
        </View>
      </View>

      <Button style = {{
        flexDirection: "row", 
        justifyContent:"space-around", 
      }} 
      icon={<Icon name='more-horiz' color='white'/>} title="Read more" backgroundColor="#03A9F4" 
      onPress = {() => onPress(item.url)}/>
    </Card>
  );
}

export default function App() {
  let [isLoading, setLoadingState] = useState(true);
  const [articles, setArticles] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [isAllLoaded, setIsAllLoaded] = useState(false);
  let [haveError, setError] = useState(null);

  const cacheImages = async (articles) => {
    await articles.map((item)=>{
      if(item.urlToImage !== '' && item.urlToImage !== null){
        Image.prefetch(item.urlToImage);
      }
    });
  }

  const loadNews = async () => {
    if(isAllLoaded) return;
    try{
      setLoadingState(true);

      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=75e294d98d254b598c88b4c18dd334a2&page=${pageNumber}&pageSize=5`);
      const data = await res.json();

      if(data.articles.length > 0){
        cacheImages(data.articles);
        setArticles(articles.concat(data.articles));
        setPageNumber(pageNumber + 1);
      }else{
        setIsAllLoaded(true);
      }

      setLoadingState(false);
    }catch (e){
      console.log(e);
      setError(e);
    };
  };

  useEffect(
    () => {
      loadNews();
    }, []
  );

  if(haveError != null){
    return(
      <View style={styles.container}>
        <Text>There has been an error. Please restart the app</Text>
      </View> 
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>You loaded this many articles:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>
      <FlatList
      data={articles}
      renderItem={NewsItem}
      keyExtractor={(item, idx) => item.title}
      onEndReached={loadNews} 
      onEndReachedThreshold={1}
      ListFooterComponent={
      <View style={[styles.containerFlex, {marginVertical: 10}]}>
        {
          isAllLoaded? 
          <Text style={styles.info}>The end of headlines</Text> :
          <ActivityIndicator size="large" loading={isLoading}/>
        }
      </View>
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  containerFlex: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

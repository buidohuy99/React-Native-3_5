import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

const CHOICES = [
  {
    name: 'Rock',
    picture: require('./assets/rock.png'), 
  },
  {
    name: 'Paper',
    picture: require('./assets/paper.png')
  },
  {
    name: 'Scissors',
    picture: require('./assets/scissors.png'),
  }
];

function ChoiceButton(props){
  return(
  <TouchableOpacity style={styles.buttonStyle}
    onPress={props.onPress}>
    <Text style= {styles.buttonText}>
      {props.displayText}
    </Text>
  </TouchableOpacity>)
}

function ChoiceCard({playerName,choice : {name,picture}}){
  return (
    <View style = {styles.choiceContainer}>
      <Text style = {styles.choiceDescription}>{playerName}</Text>
      <Image source = {picture} resizeMode="contain" style={styles.choiceImage}/>
      <Text style = {styles.choiceCardTitle}>{name}</Text>
    </View>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePrompt: 'Choose your weapon!',
      playerChoice: {},
      computerChoice: {},
    }
  }

  checkGameResult = (playerChoice) => {
    const compChoice = CHOICES[Math.floor(Math.random()*CHOICES.length)];
    
    const resultComp = compChoice.name;
    let result ;
    if(playerChoice === "Rock") 
      {result = resultComp === "Scissors" ? "Victory" : "Lost";}
    if(playerChoice === "Paper")
      {result = resultComp === "Rock" ? "Victory" : "Lost";}
    if(playerChoice === "Scissors") 
      {result = resultComp === "Paper" ? "Victory" : "Lost";}

    if(playerChoice === resultComp) {result = "You tie!";}

    return [result, compChoice];
  }

  onPress = (choice) => {
    const [checkResult, compChoice] = this.checkGameResult(choice.name);
    
    this.setState({
      gamePrompt: checkResult,
      computerChoice: compChoice,
      playerChoice: choice,
    });
  } 

  setResultTextColor= () => {
   switch(this.state.gamePrompt){
      case "Victory": 
        return 'green'; break;
      case "Lost":
        return 'red'; break;
      default:
        return 'black';
   }
  };
  render() {
     return (
        <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
          <Text style = {[styles.resultText,{color: this.setResultTextColor()}]}>{this.state.gamePrompt}</Text>
          <View style = {styles.choicesContainer}>
            <ChoiceCard
              playerName="Me"
              choice={this.state.playerChoice}
            />
            <Text>vs</Text>
            <ChoiceCard
              playerName="Computer"
              choice={this.state.computerChoice}
            />
          </View>
          <View style = {styles.buttonContainer}>
            {
              CHOICES.map(choice => {
                return (<ChoiceButton key={choice.name} displayText={choice.name} 
                  onPress={() => this.onPress(choice)}/>)
              })
            }
          </View>
        </ScrollView>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e9ebee',
    paddingVertical: 70,
  },
  buttonContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    flexGrow: 1,
    fontSize: 35,
  },
  choicesContainer: {
    flexGrow: 1,
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
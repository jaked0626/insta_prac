// file that is called after Landing, Login, and Register
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
// load redux libraries
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

// load components in main/
import CameraScreen from './main/Camera.js';
import FeedScreen from './main/Feed.js';
import GraphScreen from './main/Graph.js';
import ProfileScreen from './main/Profile.js';
import ScoreboardScreen from './main/Scoreboard.js';


// create bottom navigation tab
const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser(); // calls actions/index.js which calls dispatch(reducers) which updates user states 
        // must fetch user data and accompanying data every login
    }
    render() {
        const { currentUser } = this.props; // redux calls current user info, fetched earlier
        console.log(currentUser);

        if (currentUser == undefined) {
            return(<View style = {{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text textAlign={'center'}>Fetching User Info...</Text>
                   </View>) // leave blank
        }

        return (
            <Tab.Navigator
            initialRouteName='Graph'
            screenOptions={{
                tabBarShowLabel : false,
                tabBarActiveTintColor : '#A3E4D7',
                tabBarActiveBackgroundColor: "#808B96",
                tabBarInactiveBackgroundColor: '#808B96',
                tabBarInactiveTintColor: 'white',
            }}>
                <Tab.Screen name="Feed" component={FeedScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name = 'picture' color = { color } size = { 20 } />
                    )
                }} />
                <Tab.Screen name="Graph" component={GraphScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name = 'line-graph' color = { color } size = { 23 } />
                    )
                }} />
                <Tab.Screen name="Camera" component={CameraScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name = 'camera' color = { color } size = { 33 } />
                    )
                }} />
                <Tab.Screen name="Scoreboard" component={ScoreboardScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name = 'medal' color = { color } size = { 22 } />
                    )
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                options = {{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name = 'person-circle' color = { color } size = { 27 } />
                    )
                }} />
            </Tab.Navigator>
                    )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
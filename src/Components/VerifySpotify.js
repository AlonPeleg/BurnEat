import React from 'react';
import { Button, Text, View, WebView } from 'react-native';
import { AuthSession, Linking } from 'expo';

const FB_APP_ID = 'com.spotify.w-spotify';
const clientID = '59090b31175847cc8623d55393b895aa';
const clientSecretID = 'c2fb4e2b4f9a427e91bf45db2d3fa592';

export default class App extends React.Component {

    state = {
        result: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
                {this.state.result ? (
                    <WebView source={{ uri: 'https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdxcBWuJkbcy' }} style={{ width: 300, height: 100 }} />
                ) : null}
            </View>
        );
    }

    _handlePressAsync = async () => {
        var scopes = 'user-read-private user-read-email';
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl)
        let result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' + clientID +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' + encodeURIComponent(redirectUrl),
        });
        this.setState({ result });
    };
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}
import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Define Footer component
const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Thank you for visiting.</Text>
    </View>
  );
};

const Container = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <Footer />
    </View>
  );
};

const GettingStarted = ({ navigation }) => {
  return (
    <Container>
      <Text style={styles.header}>Getting Started</Text>
      <Button
        onPress={() => navigation.navigate('Signup')}
        title="Get Started"
        color="#841584"
      />
    </Container>
  );
};

const Signup = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSignup = () => {
    console.log('Signing up with:', { username, password, email });
    navigation.navigate('Login', { username, password });
  };

  return (
    <Container>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </Container>
  );
};

const Login = ({ route, navigation }) => {
  const { username, password } = route.params;

  const handleLogin = () => {
    console.log('Logging in with:', { username, password });
    navigation.navigate('Welcome', { username }); // Navigate to Welcome screen with username
  };

  return (
    <Container>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        editable={false}
      />
      <Button title="Login" onPress={handleLogin} />
    </Container>
  );
};

const Welcome = ({ navigation, route }) => {
  const { username } = route.params;

  const handleLogout = () => {
    navigation.navigate('GettingStarted');
  };

  const handleGoToProducts = () => {
    navigation.navigate('Products');
  };

  return (
    <Container>
      <Text style={styles.header}>Welcome, {username}!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Go to Products" onPress={handleGoToProducts} />
    </Container>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </Container>
  );
};



const ProductsScreen = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description for Product 1.',
      price: '$19.99',
      image: require('./watch1.jpeg'), // Example image path, adjust as per your project structure
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description for Product 2.',
      price: '$29.99',
      image: require('./watch2.jpeg'), // Example image path, adjust as per your project structure
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is the description for Product 3.',
      price: '$39.99',
      image: require('./watch3.jpeg'), // Example image path, adjust as per your project structure
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is the description for Product 4.',
      price: '$49.99',
      image: require('./watch4.jpeg'), // Example image path, adjust as per your project structure
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'This is the description for Product 5.',
      price: '$59.99',
      image: require('./watch5.jpeg'), // Example image path, adjust as per your project structure
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'This is the description for Product 6.',
      price: '$69.99',
      image: require('./watch6.jpeg'), // Example image path, adjust as per your project structure
    },
  ];

  return (
    <Container>
      <Text style={styles.header}>Products</Text>
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {products.map((product) => (
          <View style={styles.productCard} key={product.id}>
            <Image source={product.image} style={styles.productImage} resizeMode="cover" />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="GettingStarted">
        <Drawer.Screen
          name="GettingStarted"
          component={GettingStarted}
          options={{ drawerLabel: 'Getting Started' }}
        />
        <Drawer.Screen name="Signup" component={Signup} options={{ drawerLabel: 'Signup' }} />
        <Drawer.Screen name="Login" component={Login} options={{ drawerLabel: 'Login' }} />
        <Drawer.Screen name="Welcome" component={Welcome} options={{ drawerLabel: 'Welcome' }} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} options={{ drawerLabel: 'Products' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Add padding for spacing
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#0a9396',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  productsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  productCard: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#841584',
  },
});

export default App;

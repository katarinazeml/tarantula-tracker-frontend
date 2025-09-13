import React from "react";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Header />

      <main style={{ textAlign: 'center' }}>
        <h2>Welcome to Tarantula Tracker</h2>

        <pre style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#a855f7',
          textAlign: 'center',
          marginBottom: '24px',
          lineHeight: '1.2',
          overflow: 'auto'
        }}>
{`⠀⠀⠀⠀⢱⣄⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣤⡎⠀⠀⠀⠀
⠀⠀⠀⠀⣸⠏⢫⡉⠉⠙⠛⠙⣷⠀⠀⠀⠀⣼⢿⠛⠛⠉⢉⡽⠀⣧⠀⠀⠀⠀
⠀⠀⠀⣰⠋⠀⠀⣹⣧⣆⣠⣀⡼⣷⡀⢀⣴⢿⣲⣤⣤⡤⡏⠀⠀⠘⣆⠀⠀⠀
⠠⣄⡴⠃⠀⠀⣴⡿⠙⢿⣇⡀⠀⠹⣏⢿⠏⠀⠀⣁⡼⠁⢱⡀⠀⠀⠘⢦⣀⡤
⠀⠈⢿⠻⢶⣶⠟⢁⣠⣾⠿⣿⣿⣯⣿⣯⠿⣿⣿⡿⣟⠀⠀⠑⣤⠤⠒⡿⠁⠀
⠀⠀⠈⢧⠀⠹⡉⢻⣟⣻⣆⣩⣾⣍⣿⡿⣄⣾⣟⢀⣿⣶⠞⢉⠇⠀⣼⠃⠀⠀
⠀⠀⠀⢸⡂⢀⣇⠀⣹⠉⠛⣿⣿⡿⢿⡿⣿⣿⣿⠋⣠⡿⡆⢸⠀⢰⡇⠀⠀⠀
⠀⠀⠀⣸⡁⣼⣿⣿⣟⣷⣾⠿⣿⣦⠀⠀⣰⣿⣿⠿⣿⣻⣁⣘⣄⣼⣇⠀⠀⠀
⠀⠀⠈⠛⠿⢮⡉⠒⠿⣋⠙⣷⣬⠿⣷⣿⢿⣇⣽⣿⣣⠔⠒⣹⣯⠟⠉⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠙⢆⠀⠈⢆⣼⠟⣶⡸⣟⡾⢽⣿⡟⠁⠀⣰⣫⠏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⡼⠿⢧⡟⢷⣯⢱⡬⠿⢿⠀⣼⡿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡁⠀⠀⠙⣿⣻⠇⠀⠀⢈⣷⣓⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠞⠁⠉⠓⢦⣀⠘⡏⢀⡴⠚⠉⠉⠻⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢮⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
        </pre>

        <p>Get started by registering an account or browse existing users and tarantulas.</p>
      </main>
    </div>
  );
};

export default HomePage;

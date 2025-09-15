import React from "react";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Header />

      <main style={{ textAlign: 'center', marginTop: '80px'}}>
        <h2 style={{ fontSize: "30px" }} >Welcome to Tarantula Tracker</h2>

        <pre style={{
          fontFamily: 'monospace',
          fontSize: '20px',
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

            <p style={{ fontSize: "23px" }}>
              Get started by registering an account or browse existing users and tarantulas.
            </p>
      </main>
    </div>
  );
};

export default HomePage;

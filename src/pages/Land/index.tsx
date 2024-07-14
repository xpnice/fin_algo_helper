import { useNavigate } from 'react-router';
import './index.css';
import LinearRegresion from './pic/LinearRegresion.png';
import DecisionTree from './pic/Decision Tree.png';
import KMeansClustering from './pic/K-Means Clustering.png';
import KNearestNeighbors from './pic/K-Nearest Neighbors.png';
import RandomForest from './pic/Random Forest.png';
import LogisticRegression from './pic/Logistic regression.png';
import { message } from 'antd';
declare module 'react' {
  interface CSSProperties {
    '--i'?: number;
  }
}
function Land() {
  const navigate = useNavigate();
  const goToHome = () => {
    if (!localStorage.getItem('token')) {
      message.error('Please login first');
    }
    setTimeout(() => {
      if (localStorage.getItem('token')) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 3000);
  };
  const mapArr = [
    {
      title: 'Linear Regresion',
      pic: LinearRegresion,
      link: 'https://en.wikipedia.org/wiki/Linear_regression',
    },
    {
      title: 'Logistic Regression',
      pic: LogisticRegression,
      link: 'https://en.wikipedia.org/wiki/Logistic_regression',
    },
    {
      title: 'Decision Tree',
      pic: DecisionTree,
      link: 'https://en.wikipedia.org/wiki/Decision_tree',
    },
    {
      title: 'Random Forest',
      pic: RandomForest,
      link: 'https://en.wikipedia.org/wiki/Random_forest',
    },
    {
      title: 'K-Nearest Neighbors',
      pic: KNearestNeighbors,
      link: 'https://en.wikipedia.org/wiki/K-nearest_neighbors',
    },
    {
      title: 'K-Means Clustering',
      pic: KMeansClustering,
      link: 'https://en.wikipedia.org/wiki/K-means_clustering',
    },
  ];
  return (
    <div className="land">
      <div className="land-header animate__animated animate__backInDown">
        <div className="name">
          Visiable financial computing
        </div>
        <div className="block">
          Visiable financial computing
        </div>
        <div className="action">
          <div className="item">Home</div>
          <div className="item">Contact</div>

          <div className="item">FAQ</div>
        </div>
        {!localStorage.getItem('token') ? (
          <button
            className="button"
            onClick={() => navigate('/login')}
          >
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Login</span>
          </button>
        ) : null}
      </div>
      <div className="land-content">
        <div className="main-title animate__animated animate__fadeInDown">
          We help student and financial stafft to learn
          machine learning algorithm
        </div>
        <div className="sub-title animate__animated animate__fadeInUp">
          Visually show you the process of every machine
          learning algorithm
        </div>
        {/* <div className="go animate__animated animate__rotateIn">
          <button>Get Started</button>
        </div> */}
        <div className="go">
          <button id="main-button" onClick={goToHome}>
            <div className="outline"></div>
            <div className="state state--default">
              <div className="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g style={{ filter: 'url(#shadow)' }}>
                    <path
                      d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow
                        dx="0"
                        dy="1"
                        stdDeviation="0.6"
                        flood-opacity="0.5"
                      ></feDropShadow>
                    </filter>
                  </defs>
                </svg>
              </div>
              <p>
                <span style={{ '--i': 0 }}>G</span>
                <span style={{ '--i': 1 }}>e</span>
                <span style={{ '--i': 2 }}>t</span>
                <span style={{ '--i': 3 }}>S</span>
                <span style={{ '--i': 4 }}>t</span>
                <span style={{ '--i': 5 }}>a</span>
                <span style={{ '--i': 6 }}>r</span>
                <span style={{ '--i': 7 }}>t</span>
                <span style={{ '--i': 8 }}>e</span>
                <span style={{ '--i': 8 }}>d</span>
              </p>
            </div>
            <div className="state state--sent">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  stroke-width="0.5px"
                  stroke="black"
                >
                  <g style={{ filter: 'url(#shadow)' }}>
                    <path
                      fill="currentColor"
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                    ></path>
                  </g>
                </svg>
              </div>
              <p>
                <span style={{ '--i': 5 }}>W</span>
                <span style={{ '--i': 6 }}>e</span>
                <span style={{ '--i': 7 }}>l</span>
                <span style={{ '--i': 8 }}>c</span>
                <span style={{ '--i': 9 }}>o</span>
                <span style={{ '--i': 10 }}>m</span>
                <span style={{ '--i': 11 }}>e</span>
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="land-show">
        {mapArr.map(item => (
          <div className="card animate__animated animate__flipInX">
            <div className="card-image">
              <img src={item.pic} alt="" className="pic" />
            </div>
            <div className="card-description">
              <p
                className="text-title"
                onClick={() => window.open(item.link)}
              >
                {item.title}
              </p>
              <p className="text-body">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Land;

import './App.css';
import { Bar } from 'react-chartjs-2';
import {useState} from 'react';

function App() {
    const keyboardChars = [
        ['`/~', '1/!', '2/@', '3/#', '4/$', '5/%', '6/^', '7/&', '8/*', '9/(', '0/)', '-/_', '+/='],
        ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[/{', ']/}', '\\|'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'enter'],
        ['sheift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', './<', './>', '//?', 'shift'],
        ['space']
    ];
    const chars = {};
    const [str, setStr] = useState('');
    for(let i = 0; i < str.length; i++){
        const currentChar = str[i];
        if (chars[currentChar]){
            chars[currentChar]++
        }else{
            chars[currentChar] = 1; 
        }
    }
    const sortable = Object.fromEntries(
        Object.entries(chars).sort(([,a],[,b]) => b-a)
    );

    const data = {
      labels: Object.keys(sortable),
      datasets: [
        {
          label: '# of Chars',
          data: Object.values(sortable),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
        <div className="App">
          <header className="App-header">
            <div className="Title"><h1>Keyboard Heat Map</h1></div>
            <div className="Input">
                <input className="InputTextArea" type="textarea" placeholder="Input String Here" onChange={e => setStr(e.target.value)} value={str}/>
            </div>
            <div className="Display">
                <div className="LineChart">
                   <Bar data={data} options={options} />
                </div>
                <div className="Keyboard">
                {
                  keyboardChars.map((keyboardLine,i) => 
                      <div className="KeyboardLine" key={i}>
                        {
                            keyboardLine.map((c, i) => 
                                <div className="Key" key={i}>
                                    {c} {sortable[c]}
                                </div>
                            )
                        }
                      </div>
                  )
                }
                </div>
            </div>
         </header>
        </div>
    );
}

export default App;

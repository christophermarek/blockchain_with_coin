import './App.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';

interface block {
  data: [
    {
      id: string
      txIns: [
        {
          signature: string
          txOutId: string
          txOutIndex: number
        }
      ]
      txOuts: [
        {
          address: string
          amount: number
        }
      ]
    }
  ]
  difficulty: number
  hash: string
  index: number
  nonce: number
  previousHash: string
  timestamp: number
}


function App() {

  const [blockChain, setBlockChain] = useState<Array<block>>([]);

  useEffect(() => {

    async function getBlockChain() {
      try {
        const response = await axios.get('http://localhost:3001/blocks');
        let blocks = response.data;
        setBlockChain(blocks);
      } catch (error) {
        console.error(error);
        setBlockChain([]);
  
      }
    }

    getBlockChain();

  });

  

  return (
    <div className="App">
      <p>BlockChain Explorer</p>

      {blockChain.length < 1 ?
        (
          <p>Unable to fetch blockchain. Are all servers down?</p>
        )
        :
        (
          blockChain.map((block: block, index: number) => (
            <div key={index}>
              <p>Block #{index}</p>
              {index === 0 &&
                <p>Genesis Block</p>
              }
              <div className='container'>
                <div className='values'>
                  <div className='row'>
                    <p className='rowItem'>Hash</p>
                    <p className='rowItem'>{block.hash}</p>
                  </div>
                  <div className='row'>
                    <p className='rowItem'>Previous Hash</p>
                    <p className='rowItem'>{block.previousHash}</p>
                  </div>
                  <div className='row'>
                    <p className='rowItem'>Timestamp</p>
                    <p className='rowItem'>{block.timestamp}</p>
                  </div>
                  <div className='row'>
                    <p className='rowItem'>Difficulty</p>
                    <p className='rowItem'>{block.difficulty}</p>
                  </div>
                  <div className='row'>
                    <p className='rowItem'>Nonce</p>
                    <p className='rowItem'>{block.nonce}</p>
                  </div>
                  <div className='row'>
                    <p className='rowItem'>Number of transactions</p>
                    {/* Gotta change this once i test more transactions bc no way the num transactions is index 0 only */}
                    <p className='rowItem'>{block.data[0].txIns.length + block.data[0].txOuts.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

export default App;

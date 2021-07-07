import './App.css';
import axios from 'axios';

import React, { useState } from 'react';

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

  return (
    <div className="App">
      <p>Hello</p>
      <input type='button' value='Get BlockChain' onClick={() => getBlockChain()} />

      {blockChain.length < 1 ?
        (
          <p>Unable to fetch blockchain. Are all servers down?</p>
        )
        :
        (
          true
        )
      }
    </div>
  );
}

export default App;
import { createSlice } from '@reduxjs/toolkit'

class HashTable{
  constructor(size){
    this.data = new Array(size);
  }
  _hash(key){
    let hash = 0;

    for(let i = 0; i < key.length; i++){
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }

    return hash;
  }

  set(key, value){
    let index = this._hash(key);
    let bucket = this.data[index]

    if(bucket && bucket.length >= 0 ){
      this.data[index].push([key,value])
    }else{
      this.data[index]=[]
      this.data[index].push([key,value])
    }
  }
  get(key){
    //return(this.data[this._hash(key)])
    let bucket = this.data[this._hash(key)]

    if(bucket && bucket.length > 0){
      for(let i = 0; i < bucket.length; i++){
        if(bucket[i][0] === key){
          return(bucket[i][1])
        }
      }
    }else{
      return undefined
    }
   
  }
}

const myHashTable = new HashTable(5);
myHashTable.set("I",1)
myHashTable.set("V",5)
myHashTable.set("X",10)
myHashTable.set("L",50)
myHashTable.set("C",100)
myHashTable.set("D",500)
myHashTable.set("M",1000)

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
  },
  reducers: {
    romanToDecimal: (state,action) => {
      
     const decimalInput = action.payload.toUpperCase();
     const number = decimalInput.split("")
    // 50 5 1 1 1        1000 100 1000 10 100  1  5
    //  L V I I I = 58    M   C   M    X   C   I  V = 1994
    //  0,1,2,3,4        0    1   2    3   4   5  6
     let decimal = myHashTable.get(number[0]) // 50            //1000
     let current ="" 
     let previous =""
     
     for(let i = 1; i < number.length; i++){ // 1, 2, 3, 4     //1, 2, 3, 4, 5, 6

        current = myHashTable.get(number[i]); // 5, 1, 1, 1   // 100, 1000, 10, 100, 1, 5
        previous =myHashTable.get(number[i-1]); //50, 5, 1, 1 // 1000 100, 1000, 10, 100, 1
       // console.log(current, previous);
        if(current <= previous){ // 5 <= 50 , 1 <= 5, 1 <= 1, 1 <= 1       // 100 <= 1000, 1000<=100 10<=10000,  100<=10 1<=100        5<=1
          decimal += current; // 50+5 = 55 , 55+1 = 56, 56+1=57, 57+1=58   // 1000+100=1100   FALSE  1900+10=1910 FALSE  1990+1=1991   FALSE
        }else{
          decimal = decimal - previous*2 + current;                                      //  (1100-200)+1000=1900,  (1910-20)+100=1990  (1991-2)+5=1994
        }
     }
    //  console.log(decimal)
      state.value = decimal;
    },
    decimalToRoman: (state) => {
  


      state.value = 'romano';
    }
  },
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer
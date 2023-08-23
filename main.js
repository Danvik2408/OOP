function userCard(id){
    let balance=100
    let transactionLimit=100
    let historyLogs=[];
    

    function recordOperation(type, value, time){
        historyLogs.push({
            operetionType: type,
            credits: value,
            operetionTime: time,
        })
    }

    return {
        getCardOption(){
            return{
                id,
                balance,
                transactionLimit,
                historyLogs
            }
        },
        putCredits(amount){
           if(amount<=transactionLimit){
            balance+=amount
            recordOperation('recived credits', amount, new Date().toLocaleString())
           }else{
            console.log('exceded Limit')
           }
        },
        takeCredits(amount){
            if(amount<=transactionLimit){
                if(amount<=balance){
                    balance-=amount
                    recordOperation('Withdrawel of money', amount, new Date().toLocaleString())
                }else{
                    console.log('Not enough money')
                }
            }else{
                console.log(`excided limit`)
            }
        },
        setTransactionLimit(amount){
          transactionLimit=amount
          recordOperation('Change transaction limit', amount, new Date().toLocaleString())
        },
        transferCredits(amount, card){
          const taxe=0.005;
          let transferAmount=amount*taxe+amount;
          if(transferAmount<=balance && transferAmount<=transactionLimit){
            if(transferAmount<=balance){
                this.takeCredits(transferAmount)
                card.putCredits(amount)
            }else{
                console.log('not enough money')
            }
          }else{
            console.log('excided money')
          }
        }
    }


}

let card1 = userCard(1)
console.log(card1.getCardOption())
let card2 = userCard(2)


card1.putCredits(50)
console.log(card1.getCardOption())


card1.takeCredits(90)
console.log(card1.getCardOption())

card1.setTransactionLimit(5000)
console.log(card1.getCardOption())

card1.putCredits(2000)
console.log(card1.getCardOption())

card1.takeCredits(1500)
console.log(card1.getCardOption())




console.log(card2.getCardOption())

card1.transferCredits(50, card2)

console.log(card1.getCardOption())
console.log(card2.getCardOption())
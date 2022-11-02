const { io } = require("socket.io-client")

describe("socket.io", () => {
  let clientSocket;

  beforeAll((done) => {
    clientSocket = io('http://localhost:3300')
    clientSocket.on('connect', () => {
      done()
    })

    clientSocket.on('message.broadcast:delivered', (data) => {
      console.log('unread items: ', data)
    })

    clientSocket.on('user.register:ack', (data) =>{
      console.log('ack data: ', data)
    })
  });

  afterAll(() => {
    clientSocket.close();
  });

  test('Testing socket "user.register:send"', (done) => {
    // clientSocket.emit('test', 'sample Data')
    // done()
    clientSocket.emit('user.register:send', {
      userId: 1,
      username: 'alfed.alinan',
      registerId: '12346-abcdefg'
    })
    
    done()
  })

})
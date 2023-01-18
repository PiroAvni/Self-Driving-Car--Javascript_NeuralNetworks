# Javascript Car Simulator

A creddited by Radu Mariescu-Istodor via Youtube course https://www.youtube.com/watch?v=NkI9ia2cLhc

Using mordern Javascript features and artificial neural network we was able to implement a self driving car simulator.

# What are Neural Networks

A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics
the way the human brain operates. 
In this sense, neural networks refer to systems of neurons, either organic or artificial in nature.

Neural networks can adapt to changing input; so the network generates the best possible result without needing to redesign the output criteria.

Example of Neural Network

![image](https://user-images.githubusercontent.com/90833537/213179209-abd164a6-6840-4843-ab03-627aa2e2f3b3.png)


In our case we developed our very own neural network that allows us to train the network to identify of objects and to eventually self drive. 


![image](https://user-images.githubusercontent.com/90833537/213181354-f4cbe077-bd5f-4fe8-94eb-ee33ba7917ea.png)

The neurons in the first layout are connected to the sensors, they will send the signal forward to the second layer and the last layer will be connected to the car controls to make do something, the neuron in the network will work together .

# Implementation of Neural Networks.

In this case, the neural network if you was split the network, in tpo level, each level contain a floor and ceiling and conector in between.
The ceiling of one level is the floor of the next level.

Using classes we can implement a level of the first neural network, which will have a layer of input Neurons and output Neurons. There value will not necessarily match so these will be parameter in the level class. we would define the actual neurons in an array of value for both input , output and also one for the biases. Each output neuron has a bias, a value above in which it fires. 

The sensor will provide the value for the input neurons, and will be connected to the output neuron via what is called weights, the weights provided with a value between -1 and 1( postive and Negative) and will iterate through input and will contain an array size of the output. (For each input node will have an output count of connections).

The output will be determined by the resulting sum which is provided, between the input(senor) and the weights and compared to the output bias which in return determins the Car behaviour, however we will need to still training the behaviour and the behaviour will be stored in local memory.


## Quick SSL summary

SSL uses public key/private key cryptography to encrypt data communication between the server and client, to allow the server to prove its identity to the client, and the client to prove its identity to the server.

Three fundamental components are involved in setting up an SSL connection between a server and client: a certificate, a public key, and a private key. Certificates are used to identify an identity: (CN, owner, location, state,... using the X509 distinguished name).

Entity can be a person or a computer. As part of the identity, the CN or Common Name attribute is the name used to identify the domain name of the server host.

To establish a secure connection to API Connect server, a client first resolves the domain name as specified in CN. After the SSL connection has been initiated, one of the first things the server will do is send its digital certificate. The client will perform a number of validation steps before determining if it will continue with the connection. Most importantly, the client will compare the domain name of the server it intended to connect to (in this case, 172.16.50.8) with the common name (the “CN” field) found in the subject’s identity on the certificate. If these names do not match, it means the client does not trust the identity of the server. This is the hand shake step.

Public keys and private keys are number pairs with a special relationship. Any data encrypted with one key can be decrypted with the other. This is known as asymmetric encryption. The server’s public key is embedded within its certificate. The public key is freely distributed so anyone wishing to establish an encrypted channel with the server may encrypt their data using the server’s public key. Data encrypted with a private key may be decrypted with the corresponding public key. This property of keys is used to ensure the integrity of a digital certificate in a process called digital signing.

In term of server / certificate involves the following schema may help to understand the dependencies and the things that have to be done:


We need to do multiple things to get
* Get SSL Certificate for the API Connect Gateway end point from a Certificate Agency given domain name, with assured identity. The IBM self certified certificate should not work when the client will do a hostname validation.
* Set the certificate on the API Connect server host using the


## Using Self certified SSL certificate
Point the browser to the apicm server:

Generating client side key.

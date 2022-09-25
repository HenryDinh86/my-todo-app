# K8s Helm for Todo App

## Deploy Helm
Deploy Helm
```
# First install
$ helm install todo-app -n prod .

# Upgrades
$ helm upgrade -n prod todo-app .
```

Remove Helm
```
$ helm uninstall todo-app -n prod
```

## Prereqs
The following commands need to be ran manually on the Kubernetes cluster to precreate the secrets and configmap for the auto TLS/SSL certificate renewal using the cronjob bot.

Note: Run once only! Once is created, do not need to run this again.

First create an account key. (this is not used for signing the CSR!)
```
$ openssl genrsa 4096 > todo-app-account.key
```

Create another private key to sign the CSR
```
$ openssl genrsa 4096 > todo.henrydinh.net.key
```

Create CSR file
```
$ tee csr_details.txt << EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C=AU
ST=NSW
L=Sydney
O=Lexd Solutions
OU=IT
emailAddress=henry.dinh@hotmail.com
CN = todo.henrydinh.net

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = todo.henrydinh.net
EOF
```

Add these files into k8s secrets and configmap
```
# Create secret for the LetsEncrypt account key
$ kubectl create secret generic todo-henrydinh-net-account-key --from-file=key=todo-app-account.key -n prod

# Create secret for the certificate private key
$ kubectl create secret generic todo-henrydinh-net-private-key --from-file=key=todo.henrydinh.net.key -n prod

# Create configmap for the CSR request details
$ kubectl create configmap todo-henrydinh-net-csr-details-config --from-file=csr_details=csr_details.txt -n prod
```

Clean up
```
$ rm todo-app-account.key todo.henrydinh.net.key csr_details.txt
```
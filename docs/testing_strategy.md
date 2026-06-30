# Parcours métier E2E

login  
↓
catalogue  
↓
add a product to cart     
↓
go to cart
↓
checkout Information
↓
checkout overview
↓
checkout complete confirmation


# User stories (Fonctionnalités / scénarios fonctionnels)
## login
valid login 
invalid login
## Inventory
products inventory
add product to cart
remove product from cart
sort products
## Products details
view product details
add to cart
back to products
## cart
cart content
remove product
continue shopping
## Checkout
required information
overview
complete
## logout
logout


# Page Object Model

## LoginPage
goTo()
login(user)
openAndLogin(user)

## InventoryPage
addProduct(name)
removeProduct(name)
sortProducts()


## ProductDetailsPage

## CartPage
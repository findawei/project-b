var stripeElements = function(publicKey, setupIntent) {
    var stripe = Stripe(publicKey);
    var elements = stripe.elements();
  
    // Element styles
    
  
  
  
  var getSetupIntent = function(publicKey) {
    return fetch("/create-setup-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(setupIntent) {
        stripeElements(publicKey, setupIntent);
      });
  };
  
  var getPublicKey = function() {
    return fetch("/public-key", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        getSetupIntent(response.publicKey);
      });
  };
  
  // Show a spinner on payment submission
  var changeLoadingState = function(isLoading) {
    if (isLoading) {
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("button").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  };
  
  /* Shows a success / error message when the payment is complete */
  var orderComplete = function(stripe, clientSecret) {
    stripe.retrieveSetupIntent(clientSecret).then(function(result) {
      var setupIntent = result.setupIntent;
      var setupIntentJson = JSON.stringify(setupIntent, null, 2);
  
      document.querySelector(".sr-payment-form").classList.add("hidden");
      document.querySelector(".sr-result").classList.remove("hidden");
      document.querySelector("pre").textContent = setupIntentJson;
      setTimeout(function() {
        document.querySelector(".sr-result").classList.add("expand");
      }, 200);
  
      changeLoadingState(false);
    });
  };
  

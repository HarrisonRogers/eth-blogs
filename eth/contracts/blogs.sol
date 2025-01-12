// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract BlogSubscriptions {
    // Mapping from author address to their subscription fee
    mapping(address => uint256) public subscriptionFees;
    
    // Mapping from author address to subscriber address to subscription status
    mapping(address => mapping(address => bool)) public subscribed;
    
    // Event emitted when a new subscription is created
    event NewSubscription(address indexed author, address indexed subscriber);
    // Event emitted when subscription fee is updated
    event SubscriptionFeeUpdated(address indexed author, uint256 fee);

    function setSubscriptionFee(uint256 _fee) external {
        subscriptionFees[msg.sender] = _fee;
        emit SubscriptionFeeUpdated(msg.sender, _fee);
    }

    function subscribeToAuthor(address _author) external payable {
        uint256 fee = subscriptionFees[_author];
        require(fee > 0, "Author has not set a subscription fee");
        require(msg.value == fee, "Incorrect subscription fee sent");
        require(!subscribed[_author][msg.sender], "Already subscribed");
        
        subscribed[_author][msg.sender] = true;
        
        // Transfer the subscription fee to the author
        (bool sent, ) = _author.call{value: msg.value}("");
        require(sent, "Failed to send subscription fee");
        
        emit NewSubscription(_author, msg.sender);
    }

    function isSubscribedToAuthor(address _author, address _reader) external view returns (bool) {
        return subscribed[_author][_reader];
    }

    function getSubscriptionFee(address _author) external view returns (uint256) {
        return subscriptionFees[_author];
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract BlogPostFactory {
    address[] public deployedBlogPosts;
    mapping(address => uint256) public subscriptionFees;
    mapping(address => mapping(address => bool)) public subscribed;
    

    function createBlogPost(string memory title, string memory postContent, string memory date) public {
        address newBlogPost = address(new BlogPost(address(this), msg.sender, title, postContent, date));
        deployedBlogPosts.push(newBlogPost);
    }

    function getDeployedBlogPosts() public view returns(address[] memory) {
        return deployedBlogPosts;
    }

    function setSubscriptionFee(uint256 _fee) external {
        subscriptionFees[msg.sender] = _fee;
    }

    function subscribeToAuthor(address _author) external payable {
        uint256 fee = subscriptionFees[_author];
        require(fee > 0, "Author has not set a subscription fee");
        require(msg.value == fee, "Incorrect subscription fee sent");
        require(!subscribed[_author][msg.sender], "Already subscribed");
    }

    function isSubscribedToAuthor(address _author, address _reader) external view returns (bool) {
        return subscribed[_author][_reader];
    }
}

contract BlogPost {
    BlogPostFactory private factory;

    address public blogAuthor;
    string public blogTitle;
    string public blogContent;
    string public blogCreatedAtDate;

     modifier restricted() {
        require(msg.sender == blogAuthor, "Caller is not the manager");
        _;
    }

    constructor (address factoryAddress, address author, string memory title, string memory content, string memory date ) {
        factory = BlogPostFactory(factoryAddress);
        blogAuthor = author;
        blogTitle = title;
        blogContent = content;
        blogCreatedAtDate = date;
    }

    function editBlogPost(string memory newTitle, string memory newContent, string memory newDate) public restricted {
        blogTitle = newTitle;
        blogContent = newContent;
        blogCreatedAtDate = newDate;
    }

    function readBlogPost() external view returns(address author, string memory title, string memory content, string memory date) {
        require(factory.isSubscribedToAuthor(blogAuthor, msg.sender), "User is not subscribed to this author");
        return (blogAuthor, blogTitle, blogContent, blogCreatedAtDate);
    }

    function getBlogPosts() public view returns(address author, string memory title, string memory content, string memory date) {
        return (blogAuthor, blogTitle, blogContent, blogCreatedAtDate);
    }

}
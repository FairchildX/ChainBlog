// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ChainBlog {
    struct Post {
        uint256 id;
        address author;
        string title;
        string ipfsHash;
        uint256 timestamp;
        uint256 tipAmount;
    }

    mapping(uint256 => Post) public posts;
    mapping(address => uint256[]) public authorPosts;
    uint256 public postCounter;

    event PostCreated(uint256 indexed postId, address indexed author, string title, string ipfsHash);
    event PostTipped(uint256 indexed postId, address indexed tipper, uint256 amount);

    function createPost(string memory _title, string memory _ipfsHash) external {
        postCounter++;

        posts[postCounter] = Post({
            id: postCounter,
            author: msg.sender,
            title: _title,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            tipAmount: 0
        });

        authorPosts[msg.sender].push(postCounter);

        emit PostCreated(postCounter, msg.sender, _title, _ipfsHash);
    }

    function tipPost(uint256 _postId) external payable {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        require(msg.value > 0, "Tip must be greater than 0");

        Post storage post = posts[_postId];
        post.tipAmount += msg.value;

        payable(post.author).transfer(msg.value);

        emit PostTipped(_postId, msg.sender, msg.value);
    }

    function getPost(uint256 _postId) external view returns (Post memory) {
        require(_postId > 0 && _postId <= postCounter, "Invalid post ID");
        return posts[_postId];
    }

    function getAuthorPosts(address _author) external view returns (uint256[] memory) {
        return authorPosts[_author];
    }
}
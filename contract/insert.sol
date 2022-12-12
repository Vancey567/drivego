// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;


contract Cherry {

    struct fbackData{
        string userId;
        string Mobile;
    }
    fbackData[] public feedback;
   
    function store(string memory _userId,string memory _Mobile) public {
        feedback.push(fbackData(_userId,_Mobile));
    }

    function retrieve(uint i) public view returns(string memory, string memory){
        return (feedback[i].userId, feedback[i].Mobile);
    }

    function displayFeedback() public view returns(fbackData[] memory){
        return feedback;
    }
     
    function arrayLength() public view returns(uint) {
        uint arraydata = feedback.length;
        return arraydata;
    }

}
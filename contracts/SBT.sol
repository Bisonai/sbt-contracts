// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SBT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    string private baseURI;

    constructor(string memory name_, string memory symbol_, string memory baseURI_) ERC721(name_, symbol_) {
        baseURI = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // Mapping from token ID to locked status
    mapping(uint256 => bool) _locked;

    /// @notice Emitted when the locking status is changed to locked.
    /// @dev If a token is minted and the status is locked, this event should be emitted.
    /// @param tokenId The identifier for a token.
    event Locked(uint256 tokenId);

    /// @notice Emitted when the locking status is changed to unlocked.
    /// @notice currently SBT Contract does not emit Unlocked event
    /// @dev If a token is minted and the status is unlocked, this event should be emitted.
    /// @param tokenId The identifier for a token.  
    event Unlocked(uint256 tokenId);

    /// @notice Returns the locking status of an Soulbound Token
    /// @dev SBTs assigned to zero address are considered invalid, and queries
    /// about them do throw.
    /// @param tokenId The identifier for an SBT.
    function locked(uint256 tokenId) external view returns (bool) {
        require(ownerOf(tokenId) != address(0));
        return _locked[tokenId];
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _locked[tokenId] = true;
        emit Locked(tokenId);

        _safeMint(to, tokenId);
    }

    modifier IsTransferAllowed(uint256 tokenId) {
        require(!_locked[tokenId]);
        _;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) 
        public virtual override(IERC721, ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(
            from,
            to,
            tokenId
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) 
        public virtual override(IERC721, ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(
            from,
            to,
            tokenId,
            data
        );
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    )  
        public virtual override(IERC721, ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(
            from,
            to,
            tokenId
        );
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

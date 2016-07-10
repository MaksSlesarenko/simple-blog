<?php
/**
 * Created by PhpStorm.
 * User: lekskazimirchuk
 * Date: 6/26/16
 * Time: 4:23 PM
 */

namespace ApiBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", unique=true, nullable=true)
     */
    private $apiKey;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $apiKeyExpiresAt;

    /**
     * @var boolean
     */
    private $apiKeyExpired;
    
    public function __construct()
    {
        parent::__construct();
        $this->apiKeyExpired = false;
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * @param string $apiKey
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    /**
     * @return \DateTime
     */
    public function getApiKeyExpiresAt()
    {
        return $this->apiKeyExpiresAt;
    }

    /**
     * @param \DateTime $apiKeyExpiresAt
     */
    public function setApiKeyExpiresAt($apiKeyExpiresAt)
    {
        $this->apiKeyExpiresAt = $apiKeyExpiresAt;
    }
    
    public function isApiKeyExpired()
    {
        if (true === $this->apiKeyExpired) {
            return false;
        }
        
        $now = \DateTime::createFromFormat(
            'Y-m-d H:i:s', 
            new \DateTime(date('Y-m-d H:i:s')), 
            new \DateTimeZone('UTC')
        );
        

        if (null !== $this->apiKeyExpiresAt && $this->apiKeyExpiresAt < $now) {
            return false;
        }

        return true;
    }
}
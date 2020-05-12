using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class AlternativeTouch : MonoBehaviour
{
    public float speed;
    public float jumpForce;
    private float moveInput;
    
    private Rigidbody2D rb;

    private bool isGround = true;
    public Transform groundCheck;
    public float checkRadius;
    public LayerMask whatIsGround;

    private int doubleJump;
    public int jumpValue;

    

    void Start()
    {
        doubleJump = jumpValue;
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        isGround = Physics2D.OverlapCircle(groundCheck.position, checkRadius, whatIsGround);

        moveInput = Input.GetAxis("Horizontal");
        
        rb.velocity = new Vector2(moveInput * speed, rb.velocity.y);

        if (isGround == true)
        {
            doubleJump = jumpValue;
        }

        if (Input.GetKeyDown(KeyCode.Space) && doubleJump > 0)
        {
            rb.velocity = Vector2.up * jumpForce;
            doubleJump--;
        }
        else if (Input.GetKeyDown(KeyCode.Space) && doubleJump == 0 && isGround == true)
        {
            rb.velocity = Vector2.up * jumpForce;
        }

    }

    

}
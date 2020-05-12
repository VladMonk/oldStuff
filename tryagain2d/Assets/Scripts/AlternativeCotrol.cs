using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AlternativeCotrol : MonoBehaviour
{
    public float speed;
    public float jumpForce;
    public float moveInput;

    private Rigidbody2D rb;

    private bool isGround = true;
    public Transform groundCheck;
    public float checkRadius;
    public LayerMask whatIsGround;

    private int doubleJump;
    public int jumpValue;

	private bool pressed;
	public Button button;

    void Start()
    {
		moveInput = 0;
        doubleJump = jumpValue;
        rb = GetComponent<Rigidbody2D>();
    }

    void FixedUpdate()
    {
        
        isGround = Physics2D.OverlapCircle(groundCheck.position, checkRadius, whatIsGround);

        
        rb.velocity = new Vector2(moveInput * speed, rb.velocity.y);

        if (isGround == true)
        {
            doubleJump = jumpValue; 
        }

        
    }

	public void Zalupa()
	{
		if (doubleJump > 0)
		{
			rb.velocity = Vector2.up * jumpForce;
			doubleJump--;
		}
		else if (doubleJump == 0 && isGround == true)

		{
			rb.velocity = Vector2.up * jumpForce;
		}
	}

    

}

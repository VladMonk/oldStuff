using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{


    public float damping = 1.5f;
    public Vector3 offset = new Vector3(2f, 1f);
    public bool faceLeft;
    private Transform player;
    private int lastX;

    void Start()
    {
        offset = new Vector3(Mathf.Abs(offset.x), offset.y);
        FindPlayer(faceLeft);
    }

    public void FindPlayer(bool playerFaceLeft)
    {
        player = GameObject.FindGameObjectWithTag("Player").transform;
        lastX = Mathf.RoundToInt(player.position.x);
        if (playerFaceLeft)
        {
            transform.position = new Vector4(player.position.x - offset.x, player.position.y + offset.y, transform.position.z);
        }
        else
        {
            transform.position = new Vector4(player.position.x + offset.x, player.position.y + offset.y, transform.position.z);
        }
    }

    void Update()
    {
        if (player)
        {
            int currentX = Mathf.RoundToInt(player.position.x);
            if (currentX > lastX) faceLeft = false; else if (currentX < lastX) faceLeft = true;
            lastX = Mathf.RoundToInt(player.position.x);

            Vector3 target;
            if (faceLeft)
            {
                target = new Vector4(player.position.x - offset.x, player.position.y + offset.y, transform.position.z);
            }
            else
            {
                target = new Vector4(player.position.x + offset.x, player.position.y + offset.y, transform.position.z);
            }
            Vector3 currentPosition = Vector4.Lerp(transform.position, target, damping * Time.deltaTime);
            transform.position = currentPosition;
        }
    }
}

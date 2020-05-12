using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class TrapTrigger : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "TrapSuka")
        {
            transform.position = transform.TransformDirection (-4f, 0, 0);
            
        }
    }
}

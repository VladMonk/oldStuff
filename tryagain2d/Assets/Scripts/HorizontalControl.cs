using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HorizontalControl : MonoBehaviour
{
    

    public AlternativeCotrol control;
    public bool left;

    void OnMouseDown()
    {
        if(left)
        {
            control.moveInput = -1;
        }
        else
        {
            control.moveInput = 1;
        }
    }

    private void OnMouseUp()
    {
        control.moveInput = 0;
    }

}


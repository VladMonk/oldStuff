using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class KeyTriggerLvl2 : MonoBehaviour
{
    public bool exit = false;

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Key")
        {
            Destroy(other.gameObject);
            exit = true;
        }
        if (exit == true && other.tag == "Lock")
        {
            SceneManager.LoadScene("MainMenu");
        }
    }
}


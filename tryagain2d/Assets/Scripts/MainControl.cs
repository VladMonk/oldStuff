using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainControl : MonoBehaviour
{
    public GameObject ngbuttons;

    public void NewGameLoadScenes()
    {
        SceneManager.LoadScene("Bit2D");
    }
}

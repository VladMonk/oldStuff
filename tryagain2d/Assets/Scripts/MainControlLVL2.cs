using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainControlLVL2 : MonoBehaviour
{
    public GameObject ngbuttons;

    public void NewGameLoadScenes()
    {
        SceneManager.LoadScene("Bit3D");
    }
}
